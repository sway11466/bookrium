/**
 * 
 */
export type LabelsStore = {
  labels: Map<string, Label>,
}

export type Label = {
  name: string,
  color: string,
  parent: string | null,
  count: number,
  createdAt: Date,
};

export type TreedLabel = Label & {
  children: Label[],
}
