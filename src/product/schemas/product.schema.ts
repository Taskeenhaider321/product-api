import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "../../auth/schema/auth.schema";

// Enum for Product Category 
export enum Category {
    ELECTRONICS = 'Electronics',
    FOOD = 'Food',
    FURNITURE = 'Furniture',
    DRINK = 'Drink'
}

@Schema({
    timestamps: true
})

// Schema for Product
export class Product {

    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop()
    price: number;

    @Prop()
    category: Category

    // It links the "User" Schema to "Product" Schema
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
    user: User

}

export const ProductSchema = SchemaFactory.createForClass(Product)