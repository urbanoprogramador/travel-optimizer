export class Path {
  constructor(
    public id: number,
    public sourceId: number,
    public destinationId: number,
    public cost: number,
  ) {}
}
