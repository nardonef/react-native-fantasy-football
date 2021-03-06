const _ = require('lodash');

class Player {

    constructor (rawPlayerData) {
        this._name = _.get(rawPlayerData, 'name', '');
        this._number = _.get(rawPlayerData, 'number', '');
        this._position = _.get(rawPlayerData, 'position', '');
        this._fullTeamName = _.get(rawPlayerData, 'fullTeamName', '');
        this._abbreviatedTeamName = _.get(rawPlayerData, 'abbreviatedTeamName', '');
        this._picture = _.get(rawPlayerData, 'picture', '');
        this._injuryStatus = _.get(rawPlayerData, 'injuryStatus', '');
        this._fantasyRosterPosition = _.get(rawPlayerData, 'fantasyRosterPosition', '');
    }

    get name() {
        return this._name;
    }

    get number() {
        return this._number;
    }

    get position() {
        return this._position;
    }

    get fullTeamName() {
        return this._fullTeamName;
    }

    get abbreviatedTeamName() {
        return this._abbreviatedTeamName;
    }

    get picture() {
        return this._picture;
    }

    get injuryStatus() {
        return this._injuryStatus;
    }

    get fantasyRosterPosition() {
        return this._fantasyRosterPosition;
    }

    toObject() {
        return {
            name: this.name,
            number: this.number,
            position: this.position,
            fullTeamName: this.fullTeamName,
            abbreviatedTeamName: this.abbreviatedTeamName,
            picture: this.picture,
            injuryStatus: this.injuryStatus,
            fantasyRosterPosition: this.fantasyRosterPosition
        };
    }
}

const formatYahooRoster = (roster) => {
    const formattedRoster = [];

    _.forOwn(roster, (player) => {
        if(typeof player !== "object") {
            return;
        }

        const unformattedPlayer = {
            fantasyRosterPosition: _.get(player, 'player[1].selected_position[1].position', ''),
        };

        _.forEach(player.player[0], (playerData) => {
            if(typeof player !== "object") {
                return;
            }

            if (playerData.hasOwnProperty('display_position')) {
                unformattedPlayer.position = playerData.display_position;
            }

            if (playerData.hasOwnProperty('name')) {
                unformattedPlayer.name = playerData.name.full;
            }

            if (playerData.hasOwnProperty('uniform_number')) {
                unformattedPlayer.number = playerData.uniform_number;
            }

            if (playerData.hasOwnProperty('editorial_team_full_name')) {
                unformattedPlayer.fullTeamName = playerData.editorial_team_full_name;
            }

            if (playerData.hasOwnProperty('editorial_team_abbr')) {
                unformattedPlayer.abbreviatedTeamName = playerData.editorial_team_abbr;
            }

            if (playerData.hasOwnProperty('bye_weeks')) {
                unformattedPlayer.abriviatedTeamName = playerData.bye_weeks.week;
            }

            if (playerData.hasOwnProperty('image_url')) {
                unformattedPlayer.picture = playerData.image_url;
            }

            if (playerData.hasOwnProperty('status')) {
                unformattedPlayer.injuryStatus = playerData.status;
            }
        });

        formattedRoster.push(new Player(unformattedPlayer));
    });

    return formattedRoster;
};


module.exports.Player = Player;
module.exports.formatYahooRoster = formatYahooRoster;
