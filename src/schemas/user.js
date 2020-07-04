
import t from 'tcomb-form-native';

export default User = t.struct({
  pseudo: t.String,
  firstName: t.String,
  lastName: t.String,
  password: t.maybe(t.String),
  age: t.Number,
  email: t.String,
});