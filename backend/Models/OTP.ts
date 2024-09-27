import mongoose, {Document, Schema} from "mongoose";    

interface IOtp extends Document
{
    username: string;
    otp: string;
    createdAt: string;
}

const OtpSchema: Schema = new Schema({
    username: {type: String, required: true},
    otp: {type: String, required: true},
    createdAt: {type: Date, default: Date.now, index: {expires: '5m'}}
});

const Otp = mongoose.model<IOtp>('Otp', OtpSchema);

export default Otp;