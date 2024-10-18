import { Context } from '../context.js';
import config from '../config.js';
import S3Service from '../S3Service.js';
import getPaginatedData from '../util/getPaginatedData.js';

const bucketName = config.AWS_BUCKET_NAME;
const bucketPath = config.AWS_BUCKET_PATH;
export class TestRun {
    context: Context;

    constructor(context: Context) {
        this.context = context;
    }

    async getAll(args: { first?: number | null; after?: string | null }) {
        const results = await S3Service.listSubFolders(
            bucketName,
            `${bucketPath}`,
        );

        const testExecutionIds = results
            .filter((folder) => /^(?!-)(.*)$/.test(folder))
            .map((folder) => ({ id: folder }));

        return getPaginatedData(testExecutionIds, {
            first: args.first,
            after: args.after,
        });
    }
}
