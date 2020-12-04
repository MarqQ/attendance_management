from django.db import models


class Student(models.Model):
    name = models.CharField(max_length=200)
    status = models.BooleanField(default=False, blank=True, null=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'student'
