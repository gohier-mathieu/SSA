uniform vec2 uResolution;
uniform sampler2D uPictureTexture;
uniform sampler2D uDisplacementTexture;

attribute float aIntensity;
attribute float aAngle;

varying vec3 vColor;

void main()
{
    // Déplacement basé sur la texture de displacement
    vec3 newPosition = position;
    float displacementIntensity = texture2D(uDisplacementTexture, uv).r;
    displacementIntensity = smoothstep(0.1, 0.3, displacementIntensity);

    vec3 displacement = vec3(
        cos(aAngle) * 0.2,
        sin(aAngle) * 0.2,
        1.0
    );
    displacement = normalize(displacement);
    displacement *= displacementIntensity;
    displacement *= 3.0;
    displacement *= aIntensity;

    newPosition += displacement;

    // Position finale après transformation dans le modèle, vue et projection
    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    // Récupération de l'intensité de la photo pour ajuster la taille du point
    float pictureIntensity = texture2D(uPictureTexture, uv).r;

    // Calcul de la taille du point en fonction de la position et de la résolution
    gl_PointSize = 0.15 * pictureIntensity * uResolution.y;
    gl_PointSize *= (1.0 / -viewPosition.z);

    // Transmission de la couleur au fragment shader
    vColor = vec3(pow(pictureIntensity, 2.0));
}
