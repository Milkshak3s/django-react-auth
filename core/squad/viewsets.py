from core.squad.serializers import SquadSerializer, SquadMemberTileSerializer
from core.squad.models import Squad, SquadMemberTile
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework import filters
from core.squad.permissions import IsOwner


class SquadViewSet(viewsets.ModelViewSet):
    http_method_names = ['get', 'post', 'patch', 'delete']
    serializer_class = SquadSerializer
    permission_classes = (IsAuthenticated,IsOwner)
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['created']
    ordering = ['-created']

    def get_queryset(self):
        if self.request.user.is_superuser:
            return Squad.objects.all()
        else:
            return Squad.objects.filter(owner=self.request.user)

    def get_object(self):
        lookup_field_value = self.kwargs[self.lookup_field]

        obj = Squad.objects.get(id=lookup_field_value)
        self.check_object_permissions(self.request, obj)

        return obj

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
    

class SquadMemberTileViewSet(viewsets.ModelViewSet):
    http_method_names = ['get']
    serializer_class = SquadMemberTileSerializer
    permission_classes = (IsAuthenticated,)
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['created']
    ordering = ['-created']

    def get_queryset(self):
        if self.request.user.is_superuser:
            return SquadMemberTile.objects.all()

    def get_object(self):
        lookup_field_value = self.kwargs[self.lookup_field]

        obj = SquadMemberTile.objects.get(id=lookup_field_value)
        self.check_object_permissions(self.request, obj)

        return obj
