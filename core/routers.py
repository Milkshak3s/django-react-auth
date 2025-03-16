from rest_framework.routers import SimpleRouter
from core.user.viewsets import UserViewSet
from core.auth.viewsets import LoginViewSet, RegistrationViewSet, RefreshViewSet
from core.squad.viewsets import SquadViewSet, SquadMemberTileViewSet


routes = SimpleRouter()

# AUTHENTICATION
routes.register(r'auth/login', LoginViewSet, basename='auth-login')
routes.register(r'auth/register', RegistrationViewSet, basename='auth-register')
routes.register(r'auth/refresh', RefreshViewSet, basename='auth-refresh')

# USER
routes.register(r'user', UserViewSet, basename='user')

# SQUADS
routes.register(r'squad', SquadViewSet, basename='squad')
routes.register(r'squadMemberTile', SquadMemberTileViewSet, basename='squadMemberTile')


urlpatterns = [
    *routes.urls
]
