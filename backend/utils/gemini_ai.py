
import os
import time
from dotenv import load_dotenv
from google import genai

# Load environment variables
load_dotenv()

# Create Gemini client
client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def analyze_resume_with_ai(resume_text):

    prompt = f"""
You are an expert career advisor.

Analyze the following resume and provide professional feedback.

Resume:
{resume_text}

Provide the response in the following format:

1. Strengths
2. Weaknesses
3. Missing Skills
4. Resume Improvements
5. Career Advice

Keep the response concise, practical, and suitable for a college student preparing for placements.
"""

    # Try Gemini up to 3 times
    for attempt in range(3):

        try:
            response = client.models.generate_content(
                model="gemini-flash-latest",
                contents=prompt,
            )

            return response.text

        except Exception as e:

            print(f"Gemini attempt {attempt + 1} failed:", e)

            # Stop immediately if Gemini quota is exhausted
            if "429" in str(e) or "RESOURCE_EXHAUSTED" in str(e):

                return """
AI Resume Analysis is temporarily unavailable because the Gemini API
quota has been reached.

Please try again later.
"""

            # Wait before retrying other temporary errors
            if attempt < 2:
                time.sleep(2)

    return """
AI Resume Analysis is temporarily unavailable.

Please try again later. Your resume has been uploaded successfully
and the other resume analysis features are still available.
"""
