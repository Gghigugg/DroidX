export type InstagramDraft = { recipientId?: string; text: string; mediaUrl?: string };
export type ProviderResult = { mode: "dry-run"; accepted: false; message: string };

export interface InstagramProvider {
  draftReply(input: InstagramDraft): Promise<ProviderResult>;
  publishDraft(input: InstagramDraft): Promise<ProviderResult>;
}

/** Safe placeholder. It never calls Instagram or sends/publishes anything. */
export const dryRunInstagramProvider: InstagramProvider = {
  async draftReply() {
    return { mode: "dry-run", accepted: false, message: "Draft recorded for review only. Instagram is not connected." };
  },
  async publishDraft() {
    return { mode: "dry-run", accepted: false, message: "Publishing is disabled until official Meta API setup and human approval." };
  }
};
