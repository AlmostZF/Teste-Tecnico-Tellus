export class ReservationEntity {
  id: string;
  equipmentid: string;
  employeeid: string;
  startDate: Date;
  endDate: Date;

    constructor(id: string, equipmentid: string, employeeid: string, startDate: Date, endDate: Date) {
        this.id = id;
        this.equipmentid = equipmentid;
        this.employeeid = employeeid;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}