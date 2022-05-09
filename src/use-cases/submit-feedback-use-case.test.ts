import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
    {create: createFeedbackSpy},
    {sendMail: sendMailSpy}
)



describe("submit feedback", () => {
    it("should be able to submit a feedback", async () => {
        await expect(submitFeedback.execute({
            type: "BUG",
            comment: "Example comment",
            screenshot: "data:image/png;base64teste.png"
        })).resolves.not.toThrow()

        expect(createFeedbackSpy).toBeCalled()
        expect(sendMailSpy).toBeCalled()
    })
    it("shouldn't be able to submit a feedback without a type", async () => {
        await expect(submitFeedback.execute({
            type: "",
            comment: "Example comment",
            screenshot: "data:image/png;base64teste.png"
        })).rejects.toThrow()
    })
    it("shouldn't be able to submit a feedback without a comment", async () => {
        await expect(submitFeedback.execute({
            type: "BUG",
            comment: "",
            screenshot: "data:image/png;base64teste.png"
        })).rejects.toThrow()
    })
    it("shouldn't be able to submit a feedback with an invalid screenshot format", async () => {
        await expect(submitFeedback.execute({
            type: "BUG",
            comment: "Example comment",
            screenshot: "teste.png"
        })).rejects.toThrow()
    })
})
