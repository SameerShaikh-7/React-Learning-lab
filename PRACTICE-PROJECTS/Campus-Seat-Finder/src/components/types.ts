export interface Seat {
    id: number;
    seatId: string;
    row: string;
    number: number;
    status: 'available' | 'occupied' | 'reserved';
    type: string;
}

export interface Booking {
    id: number;
    seatId: string;
    studentName: string;
    rollNo: string;
    date: string;
    status: string;
}