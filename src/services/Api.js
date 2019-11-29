export const teamsData = [
  {
    teamId: '1',
    teamName: 'Team 1',
    userRole: 'Owner',
    displayTeamId: 'abc123'
  },
  {
    teamId: '2',
    teamName: 'Team 2',
    userRole: 'Member',
    displayTeamId: 'abc123',
  },
];

export default {
  getAll() {
    return new Promise(function(resolve) {
      setTimeout(() => resolve(teamsData), 500);
    });
  }
}