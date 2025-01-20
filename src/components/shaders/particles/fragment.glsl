// Fragment Shader

varying vec3 vColor;

void main()
{
    vec2 uv = gl_PointCoord;
    float distanceToCenter = length(uv - vec2(0.5));

    // Si on est en dehors du cercle, on ignore ce pixel
    if(distanceToCenter > 0.5)
        discard;

    // Application d'un filtre couleur noir et or
    // Utilisation d'une teinte dorée, ajustée selon l'intensité de la photo
    vec3 gold = vec3(1.0, 0.843, 0.0); // Couleur de l'or (RVB)
    vec3 black = vec3(0.0, 0.0, 0.0); // Noir

    // Ajustement de la couleur : créer un dégradé noir à or en fonction de l'intensité
    vec3 finalColor = mix(black, gold, vColor.r); // Mix entre noir et or basé sur l'intensité (vColor)

    gl_FragColor = vec4(finalColor, 1.0); // Appliquer la couleur finale

    // Inclusion de la tonemapping et de l'espace colorimétrique si nécessaire
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
