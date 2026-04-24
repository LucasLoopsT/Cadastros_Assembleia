export type RevealMemberCpfBody = {
  password: string;
};

export type RevealMemberCpfResponse = {
  cpf: string;
};

export interface IGetAdmPasswordHashRepository {
  getPasswordHashByAdmId(admId: string): Promise<string | null>;
}

export interface IRevealMemberCpfRepository {
  getDecryptedCpfByMemberId(memberId: string): Promise<string | undefined>;
}
