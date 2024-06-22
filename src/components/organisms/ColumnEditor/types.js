export const ColumnType = {
  String : 'CharField',
  Boolean : 'BooleanField',
  DateField : 'DateField',
  ForeignKey : 'ForeignKey',
  PK : 'BigAutoField',
  PositiveIntegerField : 'PositiveIntegerField',
  FloatField : 'FloatField',
  ManyToManyField : 'ManyToManyField',
  TextField : 'TextField',
  OneToOneField : 'OneToOneField'
}


export const OnDeleteOptions = {
  CASCADE : 'CASCADE',
  PROTECT : 'PROTECT',
  SET_NULL : 'SET_NULL',
  DO_NOTHING : 'DO_NOTHING'
}