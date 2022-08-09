export function toStandardJSON(otherTransform?: (doc: any, ret: any, options: any) => any) {
    return {
        virtuals: true,
        transform: (doc: any, ret: any, options: any) => {
            delete ret._id;
            delete ret.__v;
            if (otherTransform) {
                return otherTransform(doc, ret, options);
            }
            return ret;
        }
    };
}