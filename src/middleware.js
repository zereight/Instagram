// graphql middleware

export const isAuthenticated = (request) => {
    // console.log(request)
    if(!request.user){
        throw Error(`You need to log in to perform this action`);
    }
}