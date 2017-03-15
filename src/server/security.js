import container from './container';
import VError from 'verror';

const queue = container.get('queue');
const security = container.get('security');

queue.bind('requests', 'security-log');

queue.consume('security-log', security.processMessage).then(()=>{
  console.log('starting consuming requests for security check was successful');
}).catch((error)=>{
  console.log(new VError(error, `[Security] consuming the security log was unsucessful`));
});
