from rest_framework import serializers

from tests.models import Test, Question


class TestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Test
        fields = ('id', 'title')


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ('id', 'test', 'text', 'positionInTest', 'answerType',
                  'answerVariants', 'correctAnswerVariants')
