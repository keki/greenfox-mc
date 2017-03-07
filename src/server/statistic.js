import container from './container';
import VError from 'verror';

const queue = container.get('queue');
const requestStatistic = container.get('requeststatistic');

queue.consume('request-statistic', requestStatistic.processMessage).then(()=>{
  console.log('starting consuming the request-statistic was successful');
}).catch((error)=>{
  console.log(new VError(error, `[Statistic] consuming the request-statistic was unsucessful`));
});
