// // import { errorHandler } from "../utils/error";
// import comment from '../models/comment.model.js'

// export const createcomment = async (req, res, next) => {
//     try {
//         const {content, postId, userId} = req.
//         body; 


//         if (userId !== req.user.id) {
//             return next (
//                 errorHandler(403, 'You are not allowed to create this comment')
//             );
//         }

//         const newcomment = new comment ({
//             content,
//             postId,
//             userId,
//         });
//         await newcomment.save();
//     }catch(error) {
//         next (error);
//     }

// };

// export const getPostcomments = async (req, res, next) => {
//     try {
//        const comments = await Comment.find({ postId: req.params.postId}).sort ({
//         createdAt: -1,
//        });
//        res.status(200).json(comments);
//     } catch (error) {
//        next(error);
//     }
// };
import Comment from '../models/comment.model.js';

export const createComment = async (req, res, next) => {
  try {
    const { content, postId, userId } = req.body;

    if (userId !== req.user.id) {
      return next(
        errorHandler(403, 'You are not allowed to create this comment')
      );
    }

    const newComment = new Comment({
      content,
      postId,
      userId,
    });
    await newComment.save();

    res.status(200).json(newComment);
  } catch (error) {
    next(error);
  }
};

export const getPostComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({
      createdAt: -1,
    });
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};