import 'source-map-support/register';
import { EventBridge } from 'aws-sdk';
import Logger from '@dazn/lambda-powertools-logger';

const { EVENT_BUS } = process.env;
const eventBridge = new EventBridge();

export const seeder = async (): Promise<void> => {
  await eventBridge.putEvents({
    Entries: [
      {
        EventBusName: EVENT_BUS,
        Source: 'serviceA',
        DetailType: 'ACCOUNT.CREATED',
        Detail: JSON.stringify({
          name: 'Dirty Mike',
          organisation: 'The Boyz',
          email: 'vagrant@hey.com',
        }),
      },
      {
        EventBusName: EVENT_BUS,
        Source: 'serviceA',
        DetailType: 'RULE.CREATED',
        Detail: JSON.stringify({
          trigger: 'EC2 Created',
          organisation: 'Test Organisation',
          resourceARN: 'xxxxxx:12344:55555:53434242',
        }),
      },
      {
        EventBusName: EVENT_BUS,
        Source: 'serviceB',
        DetailType: 'RULE.CREATED',
        Detail: JSON.stringify({
          trigger: 'EC2 Deleted',
          organisation: 'Test Organisation',
          resourceARN: 'xxxxxx:12344:55555:53434242',
        }),
      },
      {
        EventBusName: EVENT_BUS,
        Source: 'serviceC',
        DetailType: 'RTE.MATCHED',
        Detail: JSON.stringify({
          some: 'custom property',
          arbitrary: 'data goes here',
        }),
      },
    ],
  }).promise();
};

export const case1Handler = (event): void => Logger.info('Received Event for case1. Should match on any ACCOUNT.CREATED from webapp', event);
export const case2Handler = (event): void => Logger.info('Received Event for case2. Should match on any RULE.CREATED from ', event);
export const case3Handler = (event): void => Logger.info('Received Event for case3. Should match on EC2 deleted events only', event);
export const case4Handler = (event): void => Logger.info('Received Event for case4. Should match on RTE.MATCHED events only', event);
export const case5Handler = (event): void => Logger.info('Received Event for case5. Should match on ALL EVENTS', event);
