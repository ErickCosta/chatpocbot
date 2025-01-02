import { ActivityHandler, MessageFactory } from 'botbuilder';

export class EchoBot extends ActivityHandler {
    constructor() {
        super();
        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        this.onMessage(async (context, next) => {
            var replyText = `${ context.activity.text }`.toLowerCase();
            // await context.sendActivity(MessageFactory.text(replyText, replyText));
            // By calling next() you ensure that the next BotHandler is run.
            console.log(replyText)
            if ((replyText == 'yes') || (replyText == '1')) {
                replyText = `The options is: ${replyText}`;
                await context.sendActivity(replyText);
            }
            
            else if ((replyText == 'no') || (replyText == '2')) {
                replyText = `The option is: ${replyText}`;
                await context.sendActivity(replyText);
            }
            else{
                replyText = `The option is invalid: ${replyText}`;
                await context.sendActivity(replyText);
            }

            await next();
        });

        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            const welcomeText = "Hello and welcome! Type one of the options: \n\n"+
                                "1 - yes; \n\n"+
                                "2 - no; \n\n";
            for (const member of membersAdded) {
                if (member.id !== context.activity.recipient.id) {
                    await context.sendActivity(MessageFactory.text(welcomeText, welcomeText));
                }
            }
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });
    }
}
