import container from './container';
import VError from 'verror';

const requestStatistic = container.get('requeststatistic');

requestStatistic.recalculate().then(()=>{
  console.log('recalculation was successful');
}).catch((error)=>{
  console.log(new VError(error, `[Recalcuate] The recalcuation was unsuccessful`));
});
