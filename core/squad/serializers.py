from core.squad.models import Squad, SquadMemberTile
from rest_framework import serializers


class SquadSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.id')
    
    class Meta:
        model = Squad
        fields = ['id', 'name', 'description', 'created_at', 'owner', "formup"]
        read_only_field = ['id']


class SquadMemberTileSerializer(serializers.ModelSerializer):

    class Meta:
        model = SquadMemberTile
        fields = ['id', 'squad', 'user', 'created_at', 'category', "role", 'weapon', 'tool']
        read_only_field = ['id']
