const logoutController = (req, res) => {
    // Clear the token cookie
    res.clearCookie('token');
    res.send('Logout successful.');
};

module.exports = logoutController;