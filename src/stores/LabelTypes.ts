/**
 * 
 */
export type LabelsStore = {
  labels: Map<string, Label>,
}

export type Label = {
  id: string,
  name: string,
  fore_color: string,
  back_color: string,
  parent_id: string | null,
  count: number,
  createdAt: Date,
};

export type TreedLabel = Label & {
  children: Label[],
}
