/*May contain the logic for each route*/
const Logger = require('../utils/log');
const logger = new Logger();
const postgresDAL = require('../models/postgres/apiDAL');
const mongoDAL = require('../models/mongo/apiDAL');

exports.getAllGames = async (req, res) => {
    try {
        let games;
        if (req.query.db === 'postgres') {
            games = await postgresDAL.getAllGames();
         }else if (req.query.db === 'mongo') {
             games = await mongoDAL.getAllGames();
         }else {
             const postgresGames = await postgresDAL.getAllGames();
             const mongoGames = await mongoDAL.getAllGames();
             games = [...postgresGames, ...mongoGames];
        }
        res.json(games);
    } catch (error) {
        console.error("Error fetching games:", error);
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

exports.searchGames = async (req, res) => {
    try {
        let results;
        const query = req.query.query || ""; // Get the search query
        const userId = "anon"; // Placeholder for user ID
        logger.logSearch(userId, query);
        
        if (!query) {
            if (req.query.db === 'postgres') {
                results = await postgresDAL.getAllGamesWithDetails();
            } else if (req.query.db === 'mongo') {
                results = await mongoDAL.searchAllGames(); // Use the new function here
            } else {
                const postgresResults = await postgresDAL.getAllGamesWithDetails();
                const mongoResults = await mongoDAL.searchAllGames(); // And here
                results = [...postgresResults, ...mongoResults];
            }
        } else {
            if (req.query.db === 'postgres') {
                results = await postgresDAL.searchGames(query);
            } else if (req.query.db === 'mongo') {
                results = await mongoDAL.searchGames(query);
            } else {
                const postgresResults = await postgresDAL.searchGames(query);
                const mongoResults = await mongoDAL.searchGames(query);
                results = [...postgresResults, ...mongoResults];
            }
        }

        // Paginate results
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const paginatedResults = results.slice(startIndex, endIndex);

        res.render('results', { 
            results: paginatedResults, 
            page, 
            totalPages: Math.ceil(results.length / limit),
            query: query, // Pass the query variable here
            db: req.query.db // Also pass the db variable
        });
    } catch (error) {
        console.error("Error fetching search results:", error);
        res.status(500).json({ error: 'Failed to fetch search results' });
    }
};