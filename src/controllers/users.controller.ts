import { User, UserInput } from '../models/users.model'

export const getUserWishlist = async (ctx: any) => {
    try {
        const usersid = ctx.params.userid
        const user = await User.findOne({ userid: usersid })
        if (user) {
            ctx.body = user.wishlist
        } else {
            ctx.status = 404
            ctx.body = { message: 'User not found' }
        }
    } catch (error: any) {
        ctx.status = 500
        ctx.body = { message: error.message }
    }
}

export const addUserWishlist = async (ctx: any) => {
    try {
        const usersid = ctx.params.userid;
        const { wishlist }: { wishlist: string } = ctx.request.body;
        let user = await User.findOne({ userid: usersid });
        if (!user) {
            user = new User({ userid: usersid, wishlist: [] });
        }
        if (wishlist && !user.wishlist.includes(wishlist)) {
            user.wishlist.push(wishlist);
        }
        await user.save();
        ctx.body = user;
    } catch (error: any) {
        ctx.status = 500;
        ctx.body = { message: error.message };
    }
};

export const removeUserWishlist = async (ctx: any) => {
    try {
        const usersid = ctx.params.userid;
        const { wishlist }: { wishlist: string } = ctx.request.body;
        const user = await User.findOne({ userid: usersid });
        if (user) {
            if (wishlist && user.wishlist.includes(wishlist)) {
                user.wishlist = user.wishlist.filter((item) => item !== wishlist);
            }
            await user.save();
            ctx.body = user;
        } else {
            ctx.status = 404;
            ctx.body = { message: 'User not found' };
        }
    } catch (error: any) {
        ctx.status = 500;
        ctx.body = { message: error.message };
    }
}