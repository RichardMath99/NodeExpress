const { Model } = require('sequelize');
const Sequelize = require('sequelize');

const bcrypt = require('bcryptjs');

class User extends Model {
    static init(sequelize){
        super.init({
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            passBeforeHash: Sequelize.VIRTUAL,
            password: Sequelize.STRING,
        },
        {
            sequelize
        });

        this.addHook('beforeSave', async user => {
            if(user.passBeforeHash){
                user.password = await bcrypt.hash(user.passBeforeHash, 8);
            }
        });

        return this;
    }


    checkPassword(passBeforeHash){
        return bcrypt.compare(passBeforeHash, this.password);
    }
}

module.exports = User;