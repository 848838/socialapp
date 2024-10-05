const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const express = require('express')
const app = express()
const port = 5000
const jwt = require("jsonwebtoken")
const crypto = require("crypto");
const cors = require("cors");
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const http = require('http');  // Needed for socket.io
const { Server } = require('socket.io');  // Import socket.io
app.use(express.json());

app.use('/uploads', express.static('uploads'));


app.use(cors());
const server = http.createServer(app);  // Create an HTTP server
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",  // Replace with your frontend's origin
        methods: ["GET", "POST"]
    }
});

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },
  mode: 'production', // for minification
};

const router = express.Router()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
mongoose.connect('mongodb://localhost:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(() => {
    console.log("connected to backend server...");
}).catch((err) => {
    console.log('error found', err);
})


app.use(bodyParser.json());
const User = require('./models/User')
const Message = require('./models/Message')
const Shorts = require('./models/Shorts')
const Post = require('./models/Post')


app.get('/search', async (req, res) => {
    const { query } = req.query;
    try {
        const results = await Post.find({
            name: { $regex: query, $options: 'i' }
        });
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/Profile/Search', async (req, res) => {
    const { query } = req.query;
    try {
        const results = await User.find({
            name: { $regex: query, $options: 'i' }
        });
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});
app.get("/Shorts", async (req, res) => {
    try {
        const user_short = await Shorts.aggregate([{ $sample: { size: 10 } }]);
        return res.json(user_short)

    } catch (error) {
        console.log("Error Message of user", error);
        res.status(500).json({ message: "Message  failed" });
    }
})


app.get('/Details/:ShortsId', async (req, res) => {
    try {
        const Shortss = await Shorts.findById(req.params.ShortsId);
        if (!Shortss) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json(Shortss);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});
// app.post('/like/:postId', isAuthenticated, async (req, res) => {
//     const { postId } = req.params;
//     const userId = req.user.id;

//     try {
//         // Find the post by ID
//         const post = await Post.findById(postId);

//         if (!post) {
//             return res.status(404).json({ message: 'Post not found' });
//         }

//         // Check if the user has already liked the post
//         if (post.likes.includes(userId)) {
//             // If already liked, remove the like
//             post.likes = post.likes.filter(id => id.toString() !== userId.toString());
//         } else {
//             // Otherwise, add the like
//             post.likes.push(userId);
//         }

//         // Save the updated post
//         await post.save();

//         // Respond with the updated post
//         res.json(post);
//     } catch (error) {
//         console.error('Error liking post:', error);
//         res.status(500).json({ message: 'Error liking post' });
//     }
// });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
    });
});

const upload = multer({ storage: storage });
const ensureDirExists = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};
const storage2 = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'uploads/ProfileUpdate';
        ensureDirExists(uploadDir);
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload2 = multer({ storage: storage2 });
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads/ProfileUpdate', express.static(path.join(__dirname, 'uploads/ProfileUpdate')));


app.get('/test-image', (req, res) => {
    res.sendFile(path.join(__dirname, 'uploads/ProfileUpdate', 'test.jpg'));
});

const isAuthenticated = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = {
            ...decoded,
            profileImage: decoded.profileImage || '', // Default to empty string if undefined
        };
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

// In your backend file

// Endpoint to add a comment to a post
// Endpoint to add a comment to a post
app.post('/post/:postId/comments', isAuthenticated, async (req, res) => {
    const { postId } = req.params;
    const { commentText } = req.body;
    const userId = req.user.id;

    try {
        console.log('Adding comment:', { postId, userId, commentText });

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        post.comments.push({ userId, commentText });
        await post.save();

        const updatedPost = await Post.findById(postId).populate({
            path: 'comments.userId',
            select: 'userName profileImage'
        });

        console.log('Updated Post:', updatedPost);
        res.json(updatedPost.comments);
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ message: 'Error adding comment' });
    }
});




// Endpoint to get comments for a post
app.get('/post/:postId/comments', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId).populate({
            path: 'comments.userId',
            select: 'name profileImage',
        });

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.json(post.comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/post/:postId/comments', isAuthenticated, async (req, res) => {
    const { postId } = req.params;
    const { commentText } = req.body;
    const userId = req.user.id; // Ensure this retrieves the correct user ID

    try {
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        post.comments.push({ userId, commentText });
        await post.save();

        // Populate the comments with user data
        const updatedPost = await Post.findById(postId).populate({
            path: 'comments.userId',
            select: 'name profileImage',
        });

        res.json(updatedPost.comments);
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ message: 'Error adding comment' });
    }
});





app.post('/ProfileUpdate-image', isAuthenticated, upload2.single('profileImage'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const profileImageUrl = `http://localhost:5000/uploads/ProfileUpdate/${req.file.filename}`;

        const userId = req.user.id;

        const updatedUser = await User.findByIdAndUpdate(userId, { profileImage: profileImageUrl }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ profileImageUrl });
    } catch (error) {
        console.error('Error uploading profile image:', error);
        res.status(500).json({ message: 'Error uploading profile image' });
    }
});



app.get('/ProfileImages', isAuthenticated, async (req, res) => {
    try {
        const images = await Post.find({ userId: req.user.id }).sort({ createdAt: -1 }); // Fetch images uploaded by the logged-in user
        res.json(images);
    } catch (error) {
        console.error('Error fetching images:', error);
        res.status(500).json({ message: 'Error fetching images' });
    }
});
app.get('/Profile/:userId/images', isAuthenticated, async (req, res) => {
    try {
        const userId = req.params.userId;

        const images = await Post.find({
            userId
        }).sort({ createdAt: -1 });
        res.json(images);
    } catch (error) {
        console.error('Error fetching user images:', error);
        res.status(500).json({ message: 'Error fetching user images' });
    }
});

app.post("/messagestoserver", async (req, res) => {
    const { email, text, name, Mobile, Subject } = req.body
    try {


        const userInfo_message = new Message({ email, text, name, Mobile, Subject });


        await userInfo_message.save();



        res.status(201).send(userInfo_message);


    } catch (error) {
        console.log("Error Message of user", error);
        res.status(500).json({ message: "Message  failed" });
    }
})

app.post("/register", async (req, res) => {
    try {
        const { name, email, password, profileImage } = req.body;


        //check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {

            return res.status(400).json({ message: "Email already registered" });
        }

        //create a new User
        const newUser = new User({
            name: name,
            email: email,
            password: password,
            profileImage,

        });

        //generate the verification token
        newUser.verificationToken = crypto.randomBytes(20).toString("hex");

        //save the user to the database
        await newUser.save();


        //send the verification email to the registered user
        sendVerificationEmail(newUser.email, newUser.verificationToken);
        const token = jwt.sign(
            { id: newUser._id, name: newUser.name, profileImage: newUser.profileImage },
            JWT_SECRET
        );
        res.status(202).json({
            token
        });
    } catch (error) {
        console.log("Error registering user", error);
        res.status(500).json({ message: "Registration failed" });
    }
});
app.get('/Profile/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).select('-password');
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});






app.post('/like/:postId', isAuthenticated, async (req, res) => {
    const { postId } = req.params;
    const userId = req.user.id;

    try {
        // Find the post by ID
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Check if the user has already liked the post
        const userHasLiked = post.likes.includes(userId);

        if (userHasLiked) {
            // If already liked, remove the like
            post.likes = post.likes.filter(id => id.toString() !== userId.toString());
        } else {
            // Otherwise, add the like
            post.likes.push(userId);
        }

        // Save the updated post
        await post.save();

        // Respond with the updated like count and whether the user has liked the post
        res.json({
            likeCount: post.likes.length,
            userHasLiked: !userHasLiked
        });
    } catch (error) {
        console.error('Error liking post:', error);
        res.status(500).json({ message: 'Error liking post' });
    }
});

const JWT_SECRET =
    "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jdsds039[]]pou89ywe";

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;


        // check user already exits or not 

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({ error: "email or password incrrect" })
        }
        if (user.password !== password) {
            return res.status(401).json({ error: 'not found error' })
        }
        const token = jwt.sign(
            { id: user._id, name: user.name, profileImage: user.profileImage },
            JWT_SECRET
        );

        res.status(200).json({ token })
    } catch (error) {
        return res.status(500).json({ error: "login faileds" })
    }
})





app.post('/userdata', async (req, res) => {
    const { token } = req.body;
    try {

        const user = jwt.verify(token, JWT_SECRET)
        const useremail = user.name
        User.findOne({ name: useremail }).then((data) => {
            return res.send({ status: "ok", data: data })
        })
    } catch (error) {
        return res.send({ error: error })
    }
})


app.get('/all-user-data', async (req, res) => {
    try {
        const data = await User.find().select('-password'); // Exclude the password field for security
        res.send({ status: 'ok', data });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})

app.get('/images', isAuthenticated, async (req, res) => {
    try {
        const userId = req.user.id; // Extract user ID from the authenticated request
        const images = await Post.find().sort({ createdAt: -1 }).populate('userId', 'name profileImage')
            .populate('comments.userId', 'name profileImage'); // Ensure comments are also popu;

        // Attach userHasLiked to each image
        const imagesWithLikes = await Promise.all(images.map(async (image) => {
            const userHasLiked = image.likes.includes(userId);
            return {
                ...image.toObject(),
                userHasLiked,
                likeCount: image.likes.length
            };
        }));

        res.json(imagesWithLikes);
    } catch (error) {
        console.error('Error fetching images:', error);
        res.status(500).json({ message: 'Error fetching images' });
    }
});

app.delete('/post/:postId', isAuthenticated, async (req, res) => {
    const { postId } = req.params;
    const userId = req.user.id;

    try {
        // Find the post by ID
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Check if the user is the owner of the post

        // Delete the post
        await Post.findByIdAndDelete(postId);

        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ message: 'Error deleting post' });
    }
});
