import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({
    timestamps: true
})

// // Schema for User
export class User extends Document {

    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true, message: 'Duplicate Email!' })
    email: string;

    @Prop({ required: true })
    password: string;

}

export const UserSchema = SchemaFactory.createForClass(User);