
from fastapi import APIRouter, HTTPException
import httpx

router = APIRouter(
    prefix="/github",
    tags=["GitHub Analysis"]
)

GITHUB_API = "https://api.github.com"


async def github_request(url: str):
    """
    Send a request to GitHub API.
    """
    headers = {
        "Accept": "application/vnd.github+json",
        "User-Agent": "CareerPilot-AI"
    }

    async with httpx.AsyncClient(timeout=15.0) as client:
        response = await client.get(url, headers=headers)

    if response.status_code == 404:
        raise HTTPException(
            status_code=404,
            detail="GitHub user or repository not found"
        )

    if response.status_code != 200:
        raise HTTPException(
            status_code=response.status_code,
            detail="Unable to fetch data from GitHub"
        )

    return response.json()


@router.get("/analyze/{username}")
async def analyze_github(username: str):
    """
    Analyze a public GitHub profile.
    """

    username = username.strip()

    if not username:
        raise HTTPException(
            status_code=400,
            detail="GitHub username is required"
        )

    # --------------------------------------------------
    # 1. Get GitHub user profile
    # --------------------------------------------------

    user_url = f"{GITHUB_API}/users/{username}"
    user_data = await github_request(user_url)

    # --------------------------------------------------
    # 2. Get user's repositories
    # --------------------------------------------------

    repos_url = (
        f"{GITHUB_API}/users/{username}/repos"
        "?per_page=100&sort=updated"
    )

    repos = await github_request(repos_url)

    # --------------------------------------------------
    # 3. Basic profile information
    # --------------------------------------------------

    name = user_data.get("name")
    bio = user_data.get("bio")

    followers = user_data.get("followers", 0)
    following = user_data.get("following", 0)

    public_repos = user_data.get("public_repos", 0)

    profile_url = user_data.get("html_url")

    # --------------------------------------------------
    # 4. Repository analysis
    # --------------------------------------------------

    total_stars = 0
    total_forks = 0

    languages = {}
    repository_details = []

    for repo in repos:

        # Ignore forked repositories when calculating
        # the main project statistics.
        if repo.get("fork"):
            continue

        stars = repo.get("stargazers_count", 0)
        forks = repo.get("forks_count", 0)

        total_stars += stars
        total_forks += forks

        language = repo.get("language")

        if language:
            languages[language] = languages.get(language, 0) + 1

        repository_details.append({
            "name": repo.get("name"),
            "description": repo.get("description"),
            "language": language,
            "stars": stars,
            "forks": forks,
            "url": repo.get("html_url")
        })

    # --------------------------------------------------
    # 5. Find most-used programming language
    # --------------------------------------------------

    if languages:
        primary_language = max(
            languages,
            key=languages.get
        )
    else:
        primary_language = "Not Available"

    # --------------------------------------------------
    # 6. Calculate GitHub score
    # --------------------------------------------------

    score = 0

    # Public repositories
    score += min(public_repos * 2, 30)

    # Followers
    score += min(followers, 20)

    # Stars
    score += min(total_stars * 2, 20)

    # Forks
    score += min(total_forks * 2, 10)

    # Programming language usage
    if len(languages) >= 3:
        score += 10
    elif len(languages) == 2:
        score += 7
    elif len(languages) == 1:
        score += 4

    # Make sure score never exceeds 100
    score = min(score, 100)

    # --------------------------------------------------
    # 7. Generate simple recommendations
    # --------------------------------------------------

    recommendations = []

    if public_repos < 3:
        recommendations.append(
            "Create more public projects to strengthen your GitHub profile."
        )

    if total_stars == 0:
        recommendations.append(
            "Try building useful projects and improving their README files "
            "to increase visibility and GitHub stars."
        )

    if len(languages) < 2:
        recommendations.append(
            "Consider adding projects using another programming language "
            "to demonstrate broader technical skills."
        )

    if followers < 5:
        recommendations.append(
            "Improve your GitHub presence by contributing to open-source "
            "projects and collaborating with other developers."
        )

    if not recommendations:
        recommendations.append(
            "Your GitHub profile has a good foundation. "
            "Continue contributing and maintaining your projects."
        )

    # --------------------------------------------------
    # 8. Return complete analysis
    # --------------------------------------------------

    return {
        "username": username,

        "profile": {
            "name": name,
            "bio": bio,
            "followers": followers,
            "following": following,
            "public_repositories": public_repos,
            "profile_url": profile_url
        },

        "statistics": {
            "repositories_analyzed": len(repository_details),
            "total_stars": total_stars,
            "total_forks": total_forks,
            "languages_used": len(languages),
            "primary_language": primary_language
        },

        "languages": languages,

        "repositories": repository_details,

        "github_score": score,

        "recommendations": recommendations
    }
