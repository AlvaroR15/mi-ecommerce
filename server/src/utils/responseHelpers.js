const {User} = require('../database/models/index');

const succesResponse = (data, message = 'Success', statusCode = 200) => {
    return {
        meta: {
        success: true,
        status: statusCode,
        msg: message
    }, 
    data: data
}
}

const errorResponse = (message, statusCode = 500,error) => {
    return {
        meta: {
            success: false,
            status: statusCode,
            msg: message
        },
        error: error
    }
}

const userProfileResponse = async (id, req, pictureDefault) => {
    try {
        const user = await User.findByPk(id, {
            attributes: ['firstName', 'lastName', 'email', 'addres', 'country', 'picture']
        });

        if (user) {
            return succesResponse({
                user: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    adress: user.addres,
                    country: user.country,
                    picture: user.picture ? 
                        `${req.protocol}://${req.get('host')}/uploads/users/${user.picture}` : 
                        `${req.protocol}://${req.get('host')}${pictureDefault}`
                }
            }, 'User profile retrieved successfully');
        } else {
            return errorResponse('User not found', 404);
        }
    } catch (error) {
        return errorResponse('Error retrieving user profile', 500, error);
    }
};


module.exports = {
    succesResponse,
    errorResponse,
    userProfileResponse
}