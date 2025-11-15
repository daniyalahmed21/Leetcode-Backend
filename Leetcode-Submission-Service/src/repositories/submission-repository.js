import SubmissionModel from '../models/submission-model.js';

class SubmissionRepository {
    constructor() {
        this.submissionModel = SubmissionModel;
    }

    async create(submissionData) {
        console.log(submissionData)
        const newSubmission = await this.submissionModel.create(submissionData);
        return newSubmission;
    }

    async updateStatus(submissionId, newStatus) {
        try {
            const updatedSubmission = await this.submissionModel.findByIdAndUpdate(
                submissionId,
                { status: newStatus },
                { new: true }
            );
            return updatedSubmission;
        } catch (error) {
            console.error("Error updating submission status:", error);
            throw error;
        }
    }
}

export default SubmissionRepository;