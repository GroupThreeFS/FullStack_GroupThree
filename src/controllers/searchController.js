/*May contain the logic for each route*/

const postgresDAL = require('../models/postgres/apiDAL');
const mongoDAL = require('../models/mongo/apiDAL');

exports.getAllGames = async (req, res) => {
    try {
        let games;
        if (req.query.db === 'postgres') {
            games = await postgresDAL.getAllGames();
         }// else if (req.query.db === 'mongo') {
        //     games = await mongoDAL.getAllGames();
        // } else {
        //     const postgresGames = await postgresDAL.getAllGames();
        //     const mongoGames = await mongoDAL.getAllGames();
        //     games = [...postgresGames, ...mongoGames];
        // }
        res.json(games);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch games' });
    }
};

exports.getGameById = async (req, res) => {
    try {
        let game;
        if (req.query.db === 'postgres') {
            game = await postgresDAL.getGameById(req.params.gameId);
        } else if (req.query.db === 'mongo') {
            game = await mongoDAL.getGameById(req.params.gameId);
        } else {
            const postgresGame = await postgresDAL.getGameById(req.params.gameId);
            const mongoGame = await mongoDAL.getGameById(req.params.gameId);
            game = { ...postgresGame, ...mongoGame }; // Adjust based on data structure
        }
        res.json(game);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch game by ID' });
    }
};

exports.getGameDeveloper = async (req, res) => {
    try {
        let developer;
        if (req.query.db === 'postgres') {
            developer = await postgresDAL.getGameDeveloper(req.params.gameId);
        } else if (req.query.db === 'mongo') {
            developer = await mongoDAL.getGameDeveloper(req.params.gameId);
        } else {
            const postgresDeveloper = await postgresDAL.getGameDeveloper(req.params.gameId);
            const mongoDeveloper = await mongoDAL.getGameDeveloper(req.params.gameId);
            developer = { ...postgresDeveloper, ...mongoDeveloper }; // Adjust based on data structure
        }
        res.json(developer);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch game developer' });
    }
};

exports.getGameConsole = async (req, res) => {
    try {
        let consoleData;
        if (req.query.db === 'postgres') {
            consoleData = await postgresDAL.getGameConsole(req.params.gameId);
        } else if (req.query.db === 'mongo') {
            consoleData = await mongoDAL.getGameConsole(req.params.gameId);
        } else {
            const postgresConsole = await postgresDAL.getGameConsole(req.params.gameId);
            const mongoConsole = await mongoDAL.getGameConsole(req.params.gameId);
            consoleData = { ...postgresConsole, ...mongoConsole }; // Adjust based on data structure
        }
        res.json(consoleData);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch game console' });
    }
};

exports.getAllDevelopers = async (req, res) => {
    try {
        let developers;
        if (req.query.db === 'postgres') {
            developers = await postgresDAL.getAllDevelopers();
        } else if (req.query.db === 'mongo') {
            developers = await mongoDAL.getAllDevelopers();
        } else {
            const postgresDevelopers = await postgresDAL.getAllDevelopers();
            const mongoDevelopers = await mongoDAL.getAllDevelopers();
            developers = [...postgresDevelopers, ...mongoDevelopers];
        }
        res.json(developers);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch developers' });
    }
};

exports.getDeveloperById = async (req, res) => {
    try {
        let developer;
        if (req.query.db === 'postgres') {
            developer = await postgresDAL.getDeveloperById(req.params.developerId);
        } else if (req.query.db === 'mongo') {
            developer = await mongoDAL.getDeveloperById(req.params.developerId);
        } else {
            const postgresDeveloper = await postgresDAL.getDeveloperById(req.params.developerId);
            const mongoDeveloper = await mongoDAL.getDeveloperById(req.params.developerId);
            developer = { ...postgresDeveloper, ...mongoDeveloper }; // Adjust based on data structure
        }
        res.json(developer);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch developer by ID' });
    }
};

exports.getAllConsoles = async (req, res) => {
    try {
        let consoles;
        if (req.query.db === 'postgres') {
            consoles = await postgresDAL.getAllConsoles();
        } else if (req.query.db === 'mongo') {
            consoles = await mongoDAL.getAllConsoles();
        } else {
            const postgresConsoles = await postgresDAL.getAllConsoles();
            const mongoConsoles = await mongoDAL.getAllConsoles();
            consoles = [...postgresConsoles, ...mongoConsoles];
        }
        res.json(consoles);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch consoles' });
    }
};

exports.getConsoleById = async (req, res) => {
    try {
        let consoleData;
        if (req.query.db === 'postgres') {
            consoleData = await postgresDAL.getConsoleById(req.params.consoleId);
        } else if (req.query.db === 'mongo') {
            consoleData = await mongoDAL.getConsoleById(req.params.consoleId);
        } else {
            const postgresConsole = await postgresDAL.getConsoleById(req.params.consoleId);
            const mongoConsole = await mongoDAL.getConsoleById(req.params.consoleId);
            consoleData = { ...postgresConsole, ...mongoConsole }; // Adjust based on data structure
        }
        res.json(consoleData);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch console by ID' });
    }
};