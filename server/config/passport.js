import passportJwt from 'passport-jwt';
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
import { User, getUserById } from '../models/user';
import config from './database';

export function initPassport (passport){
    const opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = config.jwtSecret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        getUserById(jwt_payload._id, (err, user) => {
            if(err){
                return done(err, false);
            }else{
                return done(null, false);
            }
        });
    }));
} 