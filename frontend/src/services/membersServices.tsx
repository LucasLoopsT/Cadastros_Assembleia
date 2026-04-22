import { api } from "../lib/api";
import type {
  MemberListItem,
  MemberPayload,
  MembersPageResponse,
} from "../types/member";

export function createMember(body: MemberPayload) {
  return api.post<MemberListItem>("/users/", body);
}

export function findAllMembers() {
  return api.get<MemberListItem[]>("/users/");
}

export type FindMembersPageParams = {
  page: number;
  limit?: number;
  q?: string;
  field?: string;
};

export function findMembersPage(
  params: FindMembersPageParams,
  config?: { signal?: AbortSignal }
) {
  const { page, limit = 12, q, field } = params;
  return api.get<MembersPageResponse>("/users/", {
    params: {
      page,
      limit,
      ...(q?.trim() ? { q: q.trim() } : {}),
      ...(field ? { field } : {}),
    },
    signal: config?.signal,
  });
}

export function findMemberById(id: string) {
  return api.get<MemberListItem>(`/users/${id}`);
}

export function updateMember(id: string, body: Partial<MemberPayload>) {
  return api.patch<MemberListItem>(`/users/${id}/`, body);
}

export function deleteMember(id: string) {
  return api.delete<string>(`/users/delete/${id}`);
}
