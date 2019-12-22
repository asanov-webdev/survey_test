from django.contrib.postgres.fields import ArrayField
from django.db import models
from datetime import datetime


QUESTION_ANSWER_TYPE_CHOICES = [
    ('CH', 'CHOICE'),
    ('MU', 'CHOICE_MULT'),
    ('VA', 'VALUE'),
    ('TE', 'TEXT'),
]


class Test(models.Model):
    title = models.CharField(max_length=120)

    def __str__(self):
        return self.title


class Question(models.Model):
    test = models.ForeignKey(Test, on_delete=models.CASCADE)

    text = models.TextField()
    positionInTest = models.PositiveSmallIntegerField(
        default=None, null=True, blank=True)
    answerType = models.CharField(
        max_length=2,
        choices=QUESTION_ANSWER_TYPE_CHOICES,
        default='TE',
        null=True,
        blank=True
    )
    answerVariants = ArrayField(models.TextField(), null=True, blank=True)
    correctAnswerVariants = ArrayField(
        models.SmallIntegerField(), null=True, blank=True)

    def __str__(self):
        return self.text


class TestResult(models.Model):
    test = models.ForeignKey(Test, on_delete=models.CASCADE)

    participantName = models.CharField(max_length=30)
    timeInSeconds = models.IntegerField()
    finishTime = models.DateTimeField(default=datetime.now())

    def __str__(self):
        return 'test result'


class QuestionAnswer(models.Model):
    testResult = models.ForeignKey(
        TestResult, on_delete=models.CASCADE, default=None, null=True, blank=True)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)

    answerText = models.TextField()

    def __str__(self):
        return self.answerText
