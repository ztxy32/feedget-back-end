import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface submitFeedbackUseCaseRequest{
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbackUseCase{
    constructor(
        private feedbackRepository: FeedbacksRepository,
        private mailAdapter: MailAdapter,
    ){}

    async execute(request: submitFeedbackUseCaseRequest){
        const {type, comment, screenshot} = request;

        if(!type){
            throw new Error("Type is required.")
        }
        if(!comment){
            throw new Error("Type is required.")
        }
        if(screenshot && !screenshot.startsWith("data:image/png;base64")){
            throw new Error("Invalide image format.")
        }

        await this.feedbackRepository.create({
            type,
            comment,
            screenshot
        })
        await this.mailAdapter.sendMail({
            subject: "Novo feedback",
            body: [
                `<div style="font-family: sans-serif; font-size: 16px; color: "111"; width: 400px; overflow: "none">`,
                `<p> Tipo do feedback: ${type}`,
                `<p> Comentário: "${comment}"`,
                screenshot ? `<img src="${screenshot}" style="width:80%; border-radius: 15px; display: block; margin-left: auto; margin-right: auto;"/>` : null,
                `</div>`
            ].join("\n")
        })
    }
}