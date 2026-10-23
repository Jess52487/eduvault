import { ObjectId } from "mongodb";

// Next.js route modules may only export HTTP handlers, so the helpers shared by
// the transfer routes live here.

// Production material ids are ObjectIds; older rows and fixtures use strings.
export function toMaterialId(id) {
  return typeof id === "string" && ObjectId.isValid(id) && String(new ObjectId(id)) === id ? new ObjectId(id) : id;
}

// The event history is operator-facing; callers get the transfer without it.
export function serializeTransfer(transfer) {
  if (!transfer) return null;
  const { history: _history, ...rest } = transfer;
  return { ...rest, materialId: String(transfer.materialId) };
}
