import { catchAsyncError } from "../../utils/catchAsyncError.js";
import { messageModel } from "../../models/message.model.js";
export const allMessage = catchAsyncError(async (req, res) => {
    const fullURL = req.protocol + '://' + req.headers.host + '/user/' + req.session.userID;
    if (req.session.isLoggedIn) {
        const messages = await messageModel.find({ userID: req.session.userID });
        console.log(messages);
        res.render('messages', { messages, name: req.session.name, fullURL, isLoggedIn: req.session.isLoggedIn });
    }
    else {
        res.redirect('/login');
    }
});
