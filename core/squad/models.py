from django.db import models


class Squad(models.Model):
    name = models.CharField(max_length=128, unique=True)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey('user.User', related_name='squads', on_delete=models.CASCADE)
    formup = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"{self.name}"


class SquadMemberTile(models.Model):
    squad = models.ForeignKey(Squad, related_name='members', on_delete=models.CASCADE)
    user = models.ForeignKey('user.User', blank=True, null=True, related_name='squad_member_tiles', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    category = models.CharField(max_length=128, blank=True, null=True)
    role = models.CharField(max_length=128, blank=True, null=True)
    weapon = models.CharField(max_length=128, blank=True, null=True)
    tool = models.CharField(max_length=128, blank=True, null=True)

    def __str__(self):
        return f"{self.squad.name} - {self.id}"

