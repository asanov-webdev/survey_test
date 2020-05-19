from django.contrib.postgres.fields import ArrayField
from django.db import models
from datetime import datetime
import time


QUESTION_DISPLAY_PATTERN_CHOICES = [
    ('1', 'VERTICAL_TEXT_PICTURE'),
    ('2', 'VERTICAL_PICTURE_TEXT'),
    ('3', 'HORIZONTAL_TEXT_PICTURE'),
    ('4', 'HORIZONTAL_PICTURE_TEXT'),
]


QUESTION_ANSWER_TYPE_CHOICES = [
    ('CH', 'CHOICE'),
    ('MU', 'CHOICE_MULT'),
    ('VA', 'VALUE'),
    ('TE', 'TEXT'),
]

MODULE_USER_STATUS_CHOICES = [
    ('1', 'STUDENT'),
    ('2', 'WORKER'),
    ('3', 'ADMIN'),
]


class Test(models.Model):
    title = models.CharField(max_length=120)

    def __str__(self):
        return self.title


class TestImage(models.Model):
    test = models.name = models.ForeignKey(
        'Test', related_name='test', on_delete=models.CASCADE, blank=True, null=True)
    image_file = models.ImageField()


class Question(models.Model):
    test = models.ForeignKey(Test, on_delete=models.CASCADE)

    interrogation = models.TextField(default=None)
    text = models.TextField(null=True, blank=True)
    positionInTest = models.PositiveSmallIntegerField(
        default=None, null=True, blank=True)
    displayPattern = models.CharField(
        max_length=1,
        choices=QUESTION_DISPLAY_PATTERN_CHOICES,
        default='1',
        null=True,
        blank=True
    )
    answerType = models.CharField(
        max_length=2,
        choices=QUESTION_ANSWER_TYPE_CHOICES,
        default='TE',
        null=True,
        blank=True
    )

    def __str__(self):
        return self.interrogation


class AnswerVariant(models.Model):
    question = models.name = models.ForeignKey(
        'Question', on_delete=models.CASCADE, blank=True, null=True)

    value = models.TextField()
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return '{} ({})'.format(self.value, self.question.interrogation)


class QuestionImage(models.Model):
    question = models.name = models.ForeignKey(
        'Question', on_delete=models.CASCADE, blank=True, null=True)

    image_file = models.ImageField()

    def __str__(self):
        return self.question.interrogation


class TestResult(models.Model):
    test = models.ForeignKey(Test, on_delete=models.CASCADE)

    participantName = models.CharField(max_length=30)
    timeInSeconds = models.IntegerField()
    finishTime = models.DateTimeField(default=datetime.now())
    is_finished = models.BooleanField(default=False)

    def __str__(self):
        return '{}, finished in {} seconds at {}'.format(self.participantName, self.timeInSeconds, self.finishTime.strftime("%H:%M:%S %Y.%m.%d"))


class QuestionAnswer(models.Model):
    testResult = models.ForeignKey(
        TestResult, on_delete=models.CASCADE, default=None, null=True, blank=True)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)

    value = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.value


class ModuleUser(models.Model):
    name = models.CharField(max_length=50)
    login = models.CharField(max_length=20)
    password = models.CharField(max_length=20)
    status = models.CharField(
        max_length=1,
        choices=MODULE_USER_STATUS_CHOICES,
        default='1',
        null=True,
        blank=True
    )
    group = models.CharField(max_length=6, default=None, null=True)
    grade = models.PositiveSmallIntegerField(default=1)

    def __str__(self):
        return '{} ({})'.format(self.login, self.status)
