import prisma from "../utils/prisma";
import { throwError } from "../middlewares/errorHandler";
import { HttpStatus } from "../utils/http-status";
import { userSchema, userData } from "../validators/user.validator";
import { hash, compare } from "../utils/bcrypt";


export const userServices = {
    createUser: async (data: userData) => {
       const validatedData = userSchema.safeParse(data);
       if (!validatedData.success) {
           throwError(HttpStatus.BAD_REQUEST, validatedData.error.issues.map(({ message }) => message).join(", "));
           const checkUserAvailability = await prisma.user.findUnique({ where: { email: data.email } });
           if (checkUserAvailability){
            throwError(HttpStatus.CONFLICT, "Email already exists");
           }
       }else{
        const hashedPassword = await hash(data.password);
        const newUser = await prisma.user.create({
            data: {
                fullname: data.fullname,
                email: data.email,
                phoneNumber: data.phoneNumber,
                role: data.role,
                password: hashedPassword,
            },
        });
        const {password, ...userWithoutPassword } = newUser;
        return userWithoutPassword;;
       }
    },

    getAllUsers: async () => {
        const users = await prisma.user.findMany();
        if (!users.length){
            throwError(HttpStatus.NOT_FOUND, "No users found");
        }else{
            const usersWithoutPassword = users.map((user) => ({
                id: user.id,
                fullname: user.fullname,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role,
            }));
            return usersWithoutPassword;
        }
    },


    getUserByEmail: async (email: string) =>{
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user){
            throwError(HttpStatus.NOT_FOUND, "User not found");
        }else{
            return user;
        }
    },


    getUserById: async (id: string) => {
        const user = await prisma.user.findUnique({ where: { id } });
        if (!user){
            throwError(HttpStatus.NOT_FOUND, "User not found");
        }else{
            const { password,...userWithoutPassword } = user;
            return userWithoutPassword;
        }
    },


    updateUser: async (id: string, data: Partial<userData>) => {
        
            const updatedUser = await prisma.user.update({
                where: { id },
                data: {
                    ...data
                },
            });
            if (!updatedUser){
                throwError(HttpStatus.NOT_FOUND, "User not found");
            }else{
               
                return updatedUser;
            }
        },


    deleteUser: async (id: string) => {
        const deletedUser = await prisma.user.delete({ where: { id } });
        if (!deletedUser){
            throwError(HttpStatus.NOT_FOUND, "User not found");
        }else{
            return deletedUser;
        }
    },

    signIn: async(email: string, password: string)=>{
        const fetchedUser = await userServices.getUserByEmail(email)
        const validatedPassword = await compare(password, fetchedUser?.password!)
        if(!validatedPassword){
            throwError(HttpStatus.BAD_REQUEST, "Invalid email or password")
        }else{
            return fetchedUser
        }
    },

   
};
