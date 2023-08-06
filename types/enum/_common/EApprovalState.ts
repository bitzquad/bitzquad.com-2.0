// approval status types
enum EApprovalState {
    default = 0,
    pending = 1,
    reviewing = 8,
    rejected = 64,
    blocked = 512,
    approved = 4096,
}

export default EApprovalState;
