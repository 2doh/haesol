interface EtcItem {
  uclass: string;
  teacherName: string;
  etc: string;
}
export interface StudentInfo {
  studentPk: number;
  studentName: string;
  studentPhone: string;
  studentEtc: string;
  studentBirth: string;
  studentAddr: string;
  studentZoneCode: string;
  studentDetail: string;
  studentGender?: string;
  parentName?: string;
  connet?: string;
  parentPhone?: string;
  studentPic?: string;
  studentCreatedAt?: string;
  parentId?: string;
  studentGrade?: string;
  studentClass?: string;
  prevEtcList?: EtcItem[];
}
