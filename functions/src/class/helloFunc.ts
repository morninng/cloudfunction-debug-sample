import * as functions from 'firebase-functions';
import { HelloExec } from './hello-exec';


const f = functions.region("us-central1");


const helloFunc = f.firestore
  .document("testtest/{testId}")
  .onUpdate(async (change: any, _context: functions.EventContext) => {
    const newValue: any = change.after.data();
    const previousValue: any = change.before.data();
    const testId: any = _context.params.testId;

    console.log('testId', testId);
    console.log('previousValue', previousValue);
    console.log('newValue', newValue);

    console.log('test helloFunc')

    const helloExec = new HelloExec()
    return helloExec.test();
  
})

module.exports = helloFunc;
